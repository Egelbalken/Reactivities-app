using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    /// <summary>
    /// Stage one to add Identity. 
    /// As useal we derive from identityUser
    /// </summary>
    public class AppUser : IdentityUser
    {
        // User functions
        public string DisplayName { get; set; }

        public string Bio { get; set; }

        // For activity functions
        public ICollection<ActivityAttendee> Activities { get; set; }

        // For Photo functions
        public ICollection<Photo> Photos { get; set; }

        // For follower function
        public ICollection<UserFollowing> Followings { get; set; }

        public ICollection<UserFollowing> Followers { get; set; }

    }
}