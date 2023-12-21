using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.Data.SqlClient;
using SchoolWebServiceProphecyLabs.Data;
using SchoolWebServiceProphecyLabs.SignalR;
using Newtonsoft.Json;
namespace SchoolWebServiceProphecyLabs.Controllers

{
    public interface ITeamService
    {
        Dictionary<string, Team> Teams { get; set; }
    }

    public class TeamService : ITeamService
    {
        public Dictionary<string, Team> Teams { get; set; }
        public TeamService()
        {
            Teams = new Dictionary<string, Team>();
        }
    }
    public class Team
    {
        public List<Student> students { get; set; }
        public string teacher { get; set; }
        public string GameName { get; set; }
    }
    public class Student 
    {
        public string name { get; set; }
        public int score { get; set; }
    }
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public DataBase dataBase = new DataBase();
        private readonly ITeamService _teamService;

        public HomeController(ILogger<HomeController> logger, ITeamService teamService)
        {
            _logger = logger;
            _teamService = teamService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register([FromBody] Userdata data)
        {
            return Ok(dataBase.InsertUser(data.login, data.email, data.password));
        }

        [HttpPost]
        public IActionResult LogIn([FromBody] Userdata data)
        {
            return Ok(dataBase.Login(data.login, data.password));
        }

        [HttpPost]
        public IActionResult LobbyCreate([FromBody] GamePack pack)
        {
            var teamCode = GenerateTeamCode(5);
            _teamService.Teams[teamCode] = new Team { students = new List<Student>(), GameName = pack.Name };
            return Ok(teamCode);
        }

        private string GenerateTeamCode(int length)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        [HttpPost]
        public IActionResult GetGamePack([FromBody] GamePack pack)
        {
            var result = dataBase.GetGameData(pack.Login, pack.Name);
            return Ok(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public IActionResult GetGameList([FromBody] GamePack pack)
        {
            var result = dataBase.GetGamesList(pack.Login);
            return Ok(JsonConvert.SerializeObject(result));
        }

       
    }
    public class Userdata
    {
        public string login { get; set; }
        public string password { get; set; }
        public string email { get; set; }
    }
    public class GamePack
    {
        public string Login { get; set; }
        public string Name { get; set; }
    }
}
