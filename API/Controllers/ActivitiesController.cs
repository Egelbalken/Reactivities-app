using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using Domain;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        //Injecting Dd
        private readonly DataContext _context;

        //Injecting Dd
        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        // Get all activities
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        // For a single request by id
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}