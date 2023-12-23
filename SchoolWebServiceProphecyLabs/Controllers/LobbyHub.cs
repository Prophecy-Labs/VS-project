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

        public async Task JoinTeam(string teamCode, string username, string role, string GameName = "default")
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, teamCode);
            if (role != "teacher")
                _teamService.Teams[teamCode].students.Add(new Student { name = username, score = 0 });
            else
            {
                _teamService.Teams[teamCode].teacher = username;
                _teamService.Teams[teamCode].GameName = GameName;
            }
            await Clients.Group(teamCode).SendAsync("Notify", _teamService.Teams[teamCode].students.ToArray(), _teamService.Teams[teamCode].teacher, _teamService.Teams[teamCode].GameName);
            // await Clients.Group(teamCode).SendAsync("GetTeacher", _teamService.Teams[teamCode].students.ToArray());
        }

        public async Task StartGame(string teamCode)
        {
            await Clients.Group(teamCode).SendAsync("GamePush", null);
        }
        public async Task CheckUsers(string teamCode)
        {
            await Clients.Group(teamCode).SendAsync("Notify", _teamService.Teams[teamCode].students.ToArray(), _teamService.Teams[teamCode].teacher);
        }
        public async Task HandleAnswer(string teamCode, string studentName, int score)
        {
            _teamService.Teams[teamCode].students.FirstOrDefault(item => item.name == studentName).score += score;
            await Clients.Group(teamCode).SendAsync("Notify", _teamService.Teams[teamCode].students.ToArray());
        }
        public async Task GiveAnswer(string teamCode, string studentName, string answer)
        {
            await Clients.Group(teamCode).SendAsync("GetAnswer", studentName, answer);
        }
            public async Task HandleQuestion(string teamCode, int topicIndex, int questionIndex)
        {
            await Clients.Group(teamCode).SendAsync("OpenQuestion", topicIndex, questionIndex);
        }
    }
}