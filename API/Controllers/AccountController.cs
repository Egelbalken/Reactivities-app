using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // Setting the controller as a API controller
    // To login we need to "Allow" anonymus users to enter. Attribute [AllowAnonymous]
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        // Fields for the controllers to use Users in 
        // userManager and allso the signInManager.
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        /// <summary>
        ///
        /// /// We need to get the user object from the database..
        /// And check if he can be loged in..
        /// </summary>
        /// <param name="loginDto">Login Data transfer object</param>
        /// <returns>If we have a login user we return that, else we return a 401</returns>
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // We get the Email from the loginDto parameter, and look in FindByEmail() if we have one.
            // Then we save the users.
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            // If we dont have any hitt on users, he is Unauthorized
            if (user == null)
            {
                return Unauthorized();
            }

            // If we have a user Email that matches we take checkfor the users Passord in login.Dto prameter
            // and then check for password.
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            // If we have a authentic user
            if (result.Succeeded)
            {
                // We transfer the user data and token via DTO
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        /// <summary>
        /// Register new user to the identity.
        /// </summary>
        /// <param name="registerDto"></param>
        /// <returns>new user dto</returns>
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email already taken!");
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                return BadRequest("Username already taken!");
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem to registering a new user.");
        }

        /// <summary>
        /// This endpoint will get the current users.
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        /// <summary>
        /// Method that creates a user dto to use in the other
        /// endpoints in this Controller. We dont go "dry".
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = user.Email,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}