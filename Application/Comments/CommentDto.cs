using System;


namespace Application.Comments
{
    /// <summary>
    /// Class for the SignalR Chatt entity.
    /// </summary>
    public class CommentDto
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public string Body { get; set; }

        public string Username { get; set; }

        public string DisplayName { get; set; }

        public string Image { get; set; }


    }
}