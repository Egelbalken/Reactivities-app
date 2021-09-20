using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    // Create an Edit handler to update the profile. We only want to validate against the display
    // name here as we do not ask the user for a bio when they register so we want to allow this
    // to be optional.
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string DisplayName { get; set; }

            public string Bio { get; set; }
        }

        // Validate thrue the displayname
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
            }
        }

        /// <summary>
        /// Implementaion of a Interface Hanlder.. 
        /// whit a constructor to inject the context and user interface
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            // Task to update the Bio and Displayname.
            public async Task<Result<Unit>> Handle(
                    Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync
                    (user => user.UserName == _userAccessor.GetUsername());

                user.Bio = request.Bio ?? user.Bio;
                user.DisplayName = request.DisplayName ?? user.DisplayName;

                // We get a 200 ok what ever we change or not in bio profile.
                _context.Entry(user).State = EntityState.Modified;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Problem updating Profile!");

            }
        }
    }
}