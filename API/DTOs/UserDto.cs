namespace API.DTOs
{
    /// <summary>
    /// In the field of programming a data transfer object (DTO[1][2]) is an object that carries data between processes. The motivation for its use 
    /// is that communication between processes is usually done resorting to remote interfaces 
    /// </summary>
    public class UserDto
    {
        public string DisplayName { get; set; }

        public string Token { get; set; }

        public string Username { get; set; }

        public string Image { get; set; }

    }
}