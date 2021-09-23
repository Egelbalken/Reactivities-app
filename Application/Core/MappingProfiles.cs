using System.Linq;
using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    // Derive from a profile class.. via auto mapper.
    public class MappingProfiles : Profile
    {

        public MappingProfiles()
        {
            // Mapping from Activity to Activity
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(displayName => displayName.HostUsername, option => option
                    .MapFrom(source => source.Attendees
                        .FirstOrDefault(host => host.IsHost).AppUser.UserName));
            // Mapping for Attendee    
            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(displayName => displayName.DisplayName, o => o
                    .MapFrom(source => source.AppUser.DisplayName))
                        .ForMember(userName => userName.Username, o => o
                            .MapFrom(source => source.AppUser.UserName))
                                .ForMember(bio => bio.Bio, o => o
                                    .MapFrom(source => source.AppUser.Bio))
                                        .ForMember(d => d.Image, o => o
                                            .MapFrom(s => s.AppUser.Photos
                                                .FirstOrDefault(x => x.IsMain).Url));
            // Mapping for Profiles    
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o
                    .MapFrom(s => s.Photos
                        .FirstOrDefault(x => x.IsMain).Url));

            // Comments via Chatt    
            CreateMap<Comment, CommentDto>().ForMember(displayName => displayName.DisplayName, o => o
                    .MapFrom(source => source.Author.DisplayName))
                        .ForMember(userName => userName.Username, o => o
                            .MapFrom(source => source.Author.UserName))
                                        .ForMember(d => d.Image, o => o
                                            .MapFrom(s => s.Author.Photos
                                                .FirstOrDefault(x => x.IsMain).Url));
        }
    }
}