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
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                /// <summary>
                /// We fetch the users photo id
                /// </summary>
                /// <returns></returns>
                var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (user == null)
                {
                    return null;
                }


                /// <summary>
                /// Chech if we have photo id that matches a user photo id
                /// </summary>
                /// <returns></returns>
                var photo = user.Photos.FirstOrDefault(u => u.Id == request.Id);

                if (photo == null)
                {
                    return null;
                }

                if (photo.IsMain)
                {
                    return Result<Unit>.Failure("Oups! You cannot delete your main photo.");
                }

                /// <summary>
                /// Deleting from Cloudinary
                /// </summary>
                /// <returns>A fail if we have a problem deleteing on Cloudinary.</returns>
                var result = await _photoAccessor.DeletePhoto(photo.Id);

                if (result == null)
                {
                    return Result<Unit>.Failure("Problem deleteing photo from Cloudinary.");
                }

                // Removes the photo
                user.Photos.Remove(photo);

                /// <summary>
                /// Deleting the file url from API if there is one
                /// </summary>
                /// <returns></returns>
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Result<Unit>.Success(Unit.Value);
                }
                return Result<Unit>.Failure("Problem deleting photo from API.");

            }
        }
    }
}