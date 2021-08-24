using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System;
using Domain;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        /// CRUD - MVC
        /// Takes in the Inherenc Mediator from BaseApiController insted of
        /// implement the Mediator here. Then we get a "thiner" controller.

        /// <summary>
        /// Get all activities
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        /// <summary>
        /// For a single request by id, via the Mediator. 
        /// we make a new instanse of a Queary and check if so that we get same id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Get all activity details on id</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            // Method from BaseApi for handle the validation statsment.
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        /// <summary>
        /// For createing a single Activity we use this, IActionResult Task.
        /// We have the HttpPost attribute to send somthing to our DB
        /// We sending it via the Mediator a new command of creating a Activity
        /// </summary>
        /// <param name="activity"></param>
        /// <returns>Create activity whit id</returns>
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        /// <summary>
        /// Editing a Activity
        /// </summary>
        /// <param name="id"></param>
        /// <param name="activity"></param>
        /// <returns>Edit activity on id</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        /// <summary>
        /// Deleteing a Activity
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Delete activity on id</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}