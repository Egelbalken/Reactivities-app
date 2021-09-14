using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            // Importent whit the speling. File
            // If changes, change in postman test
            public IFormFile File { get; set; }
        }

        /// <summary>
        /// Implement interface to get Photos via this Handler.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            // Injecting fields to get acces from parameters.
            // we need to save the photo url into the database.
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                _context = context;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Egearloading we Include the User photo to the username.
                var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                // Check so we have a user..
                if (user == null)
                {
                    return null;
                }

                // We try to upload the photo.
                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                // then we check if we have a photo url
                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                // Check if there have a main photo in there
                // photos collection
                if (!user.Photos.Any(x => x.IsMain))
                {
                    photo.IsMain = true;
                }

                // The add the photo to user.
                user.Photos.Add(photo);

                // so we save the context if we have any new..
                var result = await _context.SaveChangesAsync() > 0;

                // if we have a result, then we uploade a successed photo
                if (result)
                {
                    return Result<Photo>.Success(photo);
                }

                // If not we return a failmessage.
                return Result<Photo>.Failure("Problem adding a photo!");
            }
        }
    }
}