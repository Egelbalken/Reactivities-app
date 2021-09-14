using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    // We dont using db to add photos.. we add them to a map.
    public interface IPhotoAccessor
    {
        //Uploade
        Task<Photos.PhotoUploadResult> AddPhoto(IFormFile file);

        // Delete
        Task<string> DeletePhoto(string publicId);

    }
}