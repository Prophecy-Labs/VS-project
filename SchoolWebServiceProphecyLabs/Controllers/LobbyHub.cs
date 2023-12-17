using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
namespace SchoolWebServiceProphecyLabs.SignalR
{


    public class Team
    {
        public string Code { get; set; }
        public List<string> Clients { get; set; }
    }

    public class LobbyHub : Hub
    {
        public async Task JoinTeam(string teamCode, string username)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, teamCode);
            await Clients.All.SendAsync("Notify", username);
        }

        public async Task StartGame(string teamCode)
        {
            await Clients.Group(teamCode).SendAsync("Start Game");
        }
    }
}