using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extenstions
{
    public static class ApplicationServiceExtenstions
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            // We need too allow this Policy to let the API get to our frontend from backend.
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        // SignalR needs this cors policy to be added.
                        .AllowCredentials()
                        .WithOrigins("http://localhost:3000");
                });
            });

            // Tells MediatR where to find our handlers.
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            // Added interfaces as services so we can reach 
            // currently logged in username from everywhere in application.
            services.AddScoped<IUserAccessor, UserAccessor>();

            // Adding the serves to PhotoAccessor
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            // Adds services for adding the images from www.cloudinary.com
            // Check exact speling from apps.json
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            // Service for signalR Cahtt connection on Activity
            // Allso need a endpoint for this in startap
            services.AddSignalR();
            return services;
        }
    }
}