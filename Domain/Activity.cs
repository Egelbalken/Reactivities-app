using System;
using System.Collections.Generic;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

        public bool IsCancelled { get; set; }

        // get the the attendees, create a new list to of it to it.
        // Join entity table
        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();

        // Pops List for the entity for SingalR or Chatt
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}