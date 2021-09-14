using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                /// <summary>
                /// We get the user and photos
                /// </summary>
                /// <returns></returns>
                var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (user == null)
                {
                    return null;
                }

                /// <summary>
                /// Weget photos from users
                /// </summary>
                /// <returns></returns>
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null)
                {
                    return null;
                }

                /// <summary>
                /// Checking if photo is main. If it it, set it as true.
                /// </summary>
                /// <returns></returns>
                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);

                if (currentMain != null)
                {
                    currentMain.IsMain = false;
                }

                photo.IsMain = true;

                /// <summary>
                /// If we have a Main photo we return it else we have a problem.
                /// </summary>
                /// <returns></returns>
                var Success = await _context.SaveChangesAsync() > 0;

                if (Success)
                {
                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Problem setting main photo.");
            }
        }
    }
}