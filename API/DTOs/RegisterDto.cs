using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    /// <summary>
    /// In the field of programming a data transfer object (DTO[1][2]) is an object that carries data between processes. The motivation for its use 
    /// is that communication between processes is usually done resorting to remote interfaces 
    /// </summary>
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-ö])(?=.*[A-Z].{8}$)", ErrorMessage = "Password must be complex.")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }

    }
}