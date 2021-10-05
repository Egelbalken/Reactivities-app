using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace API.Extenstions
{
    public static class HttpExtensions
    {
        /// <summary>
        /// Formated Json object whit params for pageination
        /// </summary>
        /// <param name="response"></param>
        /// <param name="currentPage"></param>
        /// <param name="itemsPerPage"></param>
        /// <param name="totalItems"></param>
        /// <param name="TotalPages"></param>
        public static void AddPaginationHeader(this HttpResponse response,
            int currentPage, int itemsPerPage, int totalItems, int TotalPages)
        {
            // Ananymus object of pages..
            var paginationHeader = new
            {
                currentPage,
                itemsPerPage,
                totalItems,
                TotalPages
            };

            // Custom header object
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader));
            // Specify custom header to webbpage reder. Deviate from this corseHeader
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}