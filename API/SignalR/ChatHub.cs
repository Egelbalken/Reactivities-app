using System;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        // Sending comment to the hub. SignalR connections
        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediator.Send(command);

            // Important to spell SenndAsync string key right.
            await Clients.Group(command.ActivityId.ToString())
            .SendAsync("ReceiveComment", comment.Value);
        }

        /// <summary>
        /// SignalR method for sending a message in chatt
        /// We dont need a close connection, the connection brakes when updating.
        /// </summary>
        /// <returns>Adding Chatts to ActivityId</returns>
        public override async Task OnConnectedAsync()
        {
            // 
            var httpContext = Context.GetHttpContext();

            // Connects the chatt to the acticity id
            var activityId = httpContext.Request.Query["activityId"];

            // Connects the chatt to any groups
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);

            // Sending the List of chat to the ActivitId that we are in.
            var result = await _mediator.Send(new List.Query { ActivityId = Guid.Parse(activityId) });

            // Sends the message chatt to the Caller.. 
            await Clients.Caller.SendAsync("LoadComments", result.Value);


        }
    }
}