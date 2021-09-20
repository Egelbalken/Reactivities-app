using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        /// <summary>
        /// Endpoint for Get Profile
        /// </summary>
        /// <param name="username">username</param>
        /// <returns>Profile user</returns>
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        /// <summary>
        /// Endpont for Edit profile bio
        /// </summary>
        /// <param name="command">Edited object profile</param>
        /// <returns>Updates the profile bio</returns>
        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}