using System;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        /// <summary>
        /// We gett Access to Cloudinary Account
        /// To get Access to the images/Photos.
        /// </summary>
        private readonly Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            // Specify the Account details property
            // remember they are in applicationsSettings.json
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            // new instance of clouadinary
            _cloudinary = new Cloudinary(account);
        }


        /// <summary>
        /// Add the Photo
        /// Importent to put the new object propertys in the right
        /// order else we got a error. Then we crop the photo.
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation()
                    .Height(500)
                    .Width(500)
                    .Crop("fill")
                };

                var uploadResult = await _cloudinary
                    .UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                };

                return new PhotoUploadResult
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString()
                };
            }

            return null;
        }

        /// <summary>
        ///  Takes in the publicid of photo and destroy the photo
        ///  if it is there. We get a 'ok' 200 from server.
        ///  else we return null.
        /// </summary>
        /// <param name="PublicId"></param>
        /// <returns></returns>
        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}