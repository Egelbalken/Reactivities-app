using System;

namespace Domain
{
    /// <summary>
    /// class/Pops for the entity for SingalR or Chatt
    /// </summary>
    public class Comment
    {
        public int Id { get; set; }

        public string Body { get; set; }

        public AppUser Author { get; set; }

        public Activity Activity { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}