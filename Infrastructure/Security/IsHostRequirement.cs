using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {

    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsHostRequirementHandler(DataContext dbContext,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            IsHostRequirement requirement)
        {
            // Cliam the Id type from DB (ID cobination of user and activity)
            var userId = context.User
                .FindFirstValue(ClaimTypes.NameIdentifier);


            // The user is not auth
            if (userId == null)
            {
                return Task.CompletedTask;
            }

            var activityId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            // Protect the auth to the host so it dont disconnects from the activity
            // Releases the memory of attendee.
            var attendee = _dbContext.ActivityAttendees
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.AppUserId == userId && x.ActivityId == activityId).Result;

            if (attendee == null)
            {
                return Task.CompletedTask;
            }

            if (attendee.IsHost)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}