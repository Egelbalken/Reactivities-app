using System.Threading.Tasks;
using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        /*
            OBS!!! Had a Error here, 1h search for all Followrelated classes.
            But in the end it was one of the brackets of username that was missig.
        */
        /// <summary>
        /// Endpoint of followController
        /// </summary>
        /// <param name="username">user is following name</param>
        /// <returns></returns>
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username)
        {
            return HandleResult(await Mediator
            .Send(new FollowToggle.Command { TargetUsername = username }));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollowings(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query { Username = username, Predicate = predicate }));
        }
    }
}