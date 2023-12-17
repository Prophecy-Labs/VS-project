using Microsoft.Data.SqlClient;
using System.Security.Cryptography.X509Certificates;

namespace SchoolWebServiceProphecyLabs.Data
{
    public class DataBase
    {
        public static SqlConnection SqlConnection = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=
            X:\VS projects\SchoolWebServiceProphecyLabs\SchoolWebServiceProphecyLabs\Data\db.mdf;Integrated Security=True");

        public string InsertUser(string login, string email, string password) {
            if (CheckUser(login))
                return "User already exist";
            string result = "Something goes wrong";
            string qs = $"insert into Users(user_login,passwordHashCode,email) values ('{login}','{password}','{email}')";
            SqlCommand cmd = new SqlCommand(qs, SqlConnection);
            SqlConnection.Open();
            if (cmd.ExecuteNonQuery() == 1)
                result = "successful";
            SqlConnection.Close();
            return result;
        }

        public string Login(string login, string password) {
            string result = "user doesnt exist";
            string qs = $"SELECT * FROM Users WHERE user_login = '{login}';";
            SqlCommand cmd = new SqlCommand(qs, SqlConnection);
            SqlConnection.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.HasRows)
            {
                reader.Read();
                if (reader.GetValue(1).ToString() == password)
                    result = "successful";
                else
                    result = "wrong password";
            }
            SqlConnection.Close();
            return result;
        }

        public bool CheckUser(string login) {
            bool result = false;
            SqlCommand cmd = new SqlCommand($"SELECT * FROM Users WHERE user_login = '{login}';", SqlConnection);
            SqlConnection.Open();
            if (cmd.ExecuteReader().HasRows)
                result = true;
            SqlConnection.Close();
            return result;
        }

        //public void CreateGame (string login, string name)
        //{
        //    SqlCommand cmd = new SqlCommand($"INSERT INTO Jeopardy (user_login, name) values ('{login}','{name}')", SqlConnection);
        //}
        //public void CreateTopic (int gameId, string title, int round) {
        //    SqlCommand cmd = new SqlCommand($"INSERT INTO Jeopardy_Topic (id_jepardy, tittle, round) values ('{gameId}','{title}','{round}')", SqlConnection);

        //}
        //public void CreateQuestion( int topicId, QuestionData data )
        //{
        //    SqlCommand cmd = new SqlCommand($"INSERT INTO Jeopardy_Question (id_topic, text, reward, answer) values ('{topicId}','{data.text}','{data.cost}','{data.answer}')", SqlConnection);
        //}
        public enum ActionType
        {
            Create,
            Update,
            Delete
        }

        public void HandleGame(ActionType action, string login, string name = null)
        {
            string command = action switch
            {
                ActionType.Create => $"INSERT INTO Jeopardy (user_login, name) values ('{login}','{name}')",
                ActionType.Update => $"UPDATE Jeopardy SET name='{name}' WHERE user_login='{login}'",
                ActionType.Delete => $"DELETE FROM Jeopardy WHERE user_login='{login}'",
                _ => throw new ArgumentException(message: "Invalid action type", paramName: nameof(action)),
            };

            SqlCommand cmd = new SqlCommand(command, SqlConnection);
 
        }

        public void HandleTopic(ActionType action, int gameId, string title = null, int round = 0)
        {
            string command = action switch
            {
                ActionType.Create => $"INSERT INTO Jeopardy_Topic (id_jepardy, tittle, round) values ('{gameId}','{title}','{round}')",
                ActionType.Update => $"UPDATE Jeopardy_Topic SET tittle='{title}', round='{round}' WHERE id_jepardy='{gameId}'",
                ActionType.Delete => $"DELETE FROM Jeopardy_Topic WHERE id_jepardy='{gameId}'",
                _ => throw new ArgumentException(message: "Invalid action type", paramName: nameof(action)),
            };

            SqlCommand cmd = new SqlCommand(command, SqlConnection);
        }

        public void HandleQuestion(ActionType action, int topicId, QuestionData data = null)
        {
            string command = action switch
            {
                ActionType.Create => $"INSERT INTO Jeopardy_Question (id_topic, text, reward, answer) values ('{topicId}','{data.text}','{data.cost}','{data.answer}')",
                ActionType.Update => $"UPDATE Jeopardy_Question SET text='{data.text}', reward='{data.cost}', answer='{data.answer}' WHERE id_topic='{topicId}'",
                ActionType.Delete => $"DELETE FROM Jeopardy_Question WHERE id_topic='{topicId}'",
                _ => throw new ArgumentException(message: "Invalid action type", paramName: nameof(action)),
            };

            SqlCommand cmd = new SqlCommand(command, SqlConnection);
        }

        public GameData GetGameData(string login) { 
            var result = new GameData();
            SqlCommand cmd = new SqlCommand($"SELECT * FROM Jeopardy WHERE user_login='{login}'", SqlConnection);
            SqlConnection.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            reader.Read();
            result.name = reader.GetString(2);
            result.topics = GetTopicData(reader.GetInt16(0));
            SqlConnection.Close();
            return result;
        }
        public List<TopicData> GetTopicData(int id)
        {
            var result = new List<TopicData>();
            SqlCommand cmd = new SqlCommand($"SELECT * FROM Jeopardy_Topic WHERE id_jepadrdy='{id}'", SqlConnection);
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                result.Add(new TopicData { title = reader.GetString(2), round = reader.GetInt16(3), questions = GetQuestionData(reader.GetInt16(0)) }) ;
            }
            return result;
        }
        public List<QuestionData> GetQuestionData(int id) {
            var result = new List<QuestionData>();
            SqlCommand cmd = new SqlCommand($"SELECT * FROM Jeopardy_Question WHERE id_topic='{id}'", SqlConnection);
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read()) {
                result.Add(new QuestionData { text = reader.GetString(2), cost = reader.GetInt16(5), answer = reader.GetString(6) }); 
            }
            return result;
        }
    }
}
