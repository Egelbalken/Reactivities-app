using System;
using System.Collections.Generic;
using Application.Profiles;

/// <summary>
/// DTO to connect users to activities
/// </summary>
namespace Application.Activities
{
    public class ActivityDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

        public bool IsCancelled { get; set; }

        // Profiles connects attendees and users
        public string HostUsername { get; set; }

        public ICollection<Profile> Attendees { get; set; }

    }
}