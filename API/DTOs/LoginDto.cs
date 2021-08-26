namespace API.DTOs
{
    /// <summary>
    /// In the field of programming a data transfer object (DTO[1][2]) is an object that carries data between processes. The motivation for its 
    /// use is that communication between processes is usually done resorting to remote interfaces 
    /// </summary>
    public class LoginDto
    {
        public string Email { get; set; }

        public string Password { get; set; }

    }
}