using Application.Activities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using API.Extenstions;
using FluentValidation.AspNetCore;
using API.Middleware;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using API.SignalR;

namespace API
{
    public class Startup
    {
        /// <summary>
        /// Changed Startup to this look to get a more std readable code.
        /// </summary>
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            // Specify that we using dluent validation in ActivityController
            services.AddControllers(options =>
            {
                // Adding a AuthorizationPolicy
                // Enables that every single endponts requiers Authentication.
                // unless we tell it do dont..
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(config =>
                {
                    config.RegisterValidatorsFromAssemblyContaining<Create>();
                });

            // Cleaned up services.. 
            // We moved them to /Extenstions/ApplicationServices.cs
            services.AddAplicationServices(_config);

            // Add the "Made" AddIdentityServices as a serivces from Extensions.cs 
            // that is added in using.
            services.AddIdentityServices(_config);
        }

        // This method gets called by the runtime. 
        // Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            // Custom error/exeption middleware
            app.UseMiddleware<ExeptionMiddleware>();

            // https://securityheaders.com/ Get security on site.
            // Protect our page so that it cannot be attacked or stolen or framed.
            // After this we need to allow some things that our app uses..
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opt => opt.NoReferrer());
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny());
            // if UseCspReportOnly we can read all security issues.
            // If using UseCsp.. Allow thins outside the domain.
            // We addon a customSourse to allow them.
            app.UseCspReportOnly(opt => opt
                .BlockAllMixedContent()
                .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com/"))
                .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:"))
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com", "blob:"))
                .ScriptSources(s => s.Self().CustomSources("sha256-Rh8MTEBtFMyFx6O4lsoOVvHhuLlcTgXK7ygQ7YPzl5A="))
            );

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }
            else
            {
                // Make our own middleweare
                app.Use(async (context, next) =>
                {
                    context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
                    await next.Invoke();
                });
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            // 1.
            // C# API runned React app
            // added for run the react build as static file index.html from API
            app.UseDefaultFiles();
            // The we run the static files in wwwroot
            app.UseStaticFiles();
            // Allso add a UseEndpoint Fallback


            app.UseCors("CorsPolicy");

            // Need to be before we app.UseAuthorization();
            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                // Added endpoint for signal R, Allso add a service.SignalR()
                endpoints.MapHub<ChatHub>("/chat");
                //2.
                // Endpont for react app run on API
                endpoints.MapFallbackToController("Index", "Fallback");
                // then create the fallback class in controllers
            });
        }
    }
}
