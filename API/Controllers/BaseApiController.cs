using API.Extenstions;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    /// <summary>
    /// Creating a Base API controller so we can use it to send data to clients.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {

        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
            .GetService<IMediator>();


        protected ActionResult HandleResult<T>(Result<T> result)
        {
            // If we try to delete or edit something we dont have.
            if (result == null)
            {
                return NotFound();
            }
            // If we have a activity and ints not null we have a success
            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }
            // If we think we have a Success but is null
            if (result.IsSuccess && result.Value == null)
            {
                return NotFound();
            }

            return BadRequest(result.Error);
        }

        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {
            // If we try to delete or edit something we dont have.
            if (result == null)
            {
                return NotFound();
            }
            // If we have a Ok 200 and ints not null we have a success
            if (result.IsSuccess && result.Value != null)
            {
                Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize,
                    result.Value.TotalCount, result.Value.TotalPages);
                return Ok(result.Value);
            }
            // If we think we have a Success but is null
            if (result.IsSuccess && result.Value == null)
            {
                return NotFound();
            }

            return BadRequest(result.Error);
        }
    }


}