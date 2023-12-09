using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;

public class Team
{
    public string Code { get; set; }
    public List<string> Clients { get; set; }
}

public class LobbyHub : Hub
{
    private static Dictionary<string, Team> Teams = new Dictionary<string, Team>();

    public string CreateTeam()
    {
        var teamCode = GenerateTeamCode(5);
        Teams[teamCode] = new Team { Code = teamCode, Clients = new List<string>() };
        return teamCode;
    }

    public bool JoinTeam(string teamCode, string clientId)
    {
        if (Teams.ContainsKey(teamCode))
        {
            Teams[teamCode].Clients.Add(clientId);
            return true;
        }
        return false;
    }

    private string GenerateTeamCode(int length)
    {
        var random = new Random();
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return new string(Enumerable.Repeat(chars, length)
          .Select(s => s[random.Next(s.Length)]).ToArray());
    }
}
