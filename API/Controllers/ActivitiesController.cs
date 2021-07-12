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
        
        // Get all activities
        // Takes in the Inherenc Mediator from BaseApiController insted of
        // implement the Mediator here. Then we get a "thiner" controller.
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        // For a single request by id, via the Mediator. 
        // we make a new instanse of a Queary and check if so that we get same id.
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id= id});
        }
    }
}