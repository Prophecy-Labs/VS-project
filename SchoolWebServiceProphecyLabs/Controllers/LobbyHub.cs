using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using SchoolWebServiceProphecyLabs.Controllers;
namespace SchoolWebServiceProphecyLabs.SignalR
{
    public class LobbyHub : Hub
    {
        private readonly ITeamService _teamService;

        public LobbyHub(ITeamService teamService)
        {
            _teamService = teamService;
        }

        public async Task JoinTeam(string teamCode, string username)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, teamCode);
            _teamService.Teams[teamCode].Add(username);
            await Clients.Group(teamCode).SendAsync("Notify", _teamService.Teams[teamCode].ToArray());
        }

        public async Task StartGame(string teamCode)
        {
            await Clients.Group(teamCode).SendAsync("GamePush", null);
        }
        public async Task CheckUsers(string teamCode)
        {
            await Clients.Group(teamCode).SendAsync("Notify", _teamService.Teams[teamCode].ToArray());
        }
    }
}