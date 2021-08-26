using System.Text;
using System.Collections.Generic;
using System.Security.Claims;
using Domain;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace API.Services
{
    /// <summary>
    /// Stage 4 is to create a Token for verification.
    /// Adding using System.IdentityModel.Tokens.Jwt; OBS! need to bee installed
    /// from the Nuget Microsoft.AspNetCore.Authentication.JwtBearer into API
    /// Did not get auto installd bu .NetCoreIdentity
    /// </summary>
    public class TokenService
    {
        /// <summary>
        /// Injction to get the json TokenKey in application.Dev json file.
        /// </summary>
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            _config = config;

        }

        /// <summary>
        /// This method will create a Token for validation to server.
        /// </summary>
        /// <param name="user">logged in user that is beeing validating</param>
        /// <returns>a tokenkey for access</returns>
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}