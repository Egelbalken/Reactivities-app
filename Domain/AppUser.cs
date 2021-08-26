using Microsoft.AspNetCore.Identity;

namespace Domain
{
    /// <summary>
    /// Stage one to add Identity. 
    /// As useal we derive from identityUser
    /// </summary>
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public string Bio { get; set; }

    }
}