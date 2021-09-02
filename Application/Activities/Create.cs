using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        // Command does not return anything as a Query do, just make so IRequest
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        /// <summary>
        /// To validate our Activity using FluentValidator package.
        /// The Activity now lives in the Command class.. then we call for it.
        /// </summary>
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            // Access the database
            private readonly DataContext _context;

            // Access the users and attendees
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            // Adding activity
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Will combine our new acticity to users and attendees
                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUsername());

                var attendee = new ActivityAttendee
                {
                    AppUser = user,
                    Activity = request.Activity,
                    IsHost = true,
                };

                // adds attendees to requested Activity
                request.Activity.Attendees.Add(attendee);

                // Adds the activity ro DB
                _context.Activities.Add(request.Activity);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to create a activity!");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}