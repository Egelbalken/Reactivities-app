using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extenstions
{
    /// <summary>
    /// Stage 3 in Identity setup. We create this class ass a middleware extension
    /// </summary>
    public static class IdentityServiceExtenstions
    {
        /// <summary>
        /// Adding the middlewar settings for the Identity and Authentication
        /// Need to be static
        /// </summary>
        /// <param name="services">for identity</param>
        /// <param name="config"></param>
        /// <returns></returns>
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
        IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
            })

            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            // uses the TokenKey from appsettings.Dev json file.
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(option =>
                {
                    option.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });

            services.AddScoped<TokenService>();

            return services;
        }
    }
}