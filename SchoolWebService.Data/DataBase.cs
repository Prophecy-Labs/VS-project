using Microsoft.Data.SqlClient;
using System.Reflection.PortableExecutable;
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
            reader.Close();
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

        public GameData GetGameData(string login, string name)
        {
            var result = new GameData();

            using (SqlConnection connection = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=
            X:\VS projects\SchoolWebServiceProphecyLabs\SchoolWebServiceProphecyLabs\Data\db.mdf;Integrated Security=True"))
            {
                connection.Open();

                using (SqlCommand cmd = new SqlCommand($"SELECT * FROM Jeopardy WHERE user_login='{login}' AND name = '{name}'", connection))
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    var id = reader.GetInt32(0);
                    result.name = name;
                    result.topics = GetTopicData(id);
                }
            } 

            return result;
        }

        public List<TopicData> GetTopicData(int id)
        {
            var result = new List<TopicData>();

            using (SqlConnection connection = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=
            X:\VS projects\SchoolWebServiceProphecyLabs\SchoolWebServiceProphecyLabs\Data\db.mdf;Integrated Security=True"))
            {
                connection.Open();

                using (SqlCommand cmd = new SqlCommand($"SELECT * FROM Jeopardy_Topic WHERE id_jeopardy='{id}'", connection))
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new TopicData { id = reader.GetInt32(0), title = reader.GetString(2), round = reader.GetInt32(3) });
                    }
                } 
            }
            foreach (var topic in result)
            {
                topic.questions = GetQuestionData(topic.id);
            }

            return result;
        }


        public List<QuestionData> GetQuestionData(int id)
        {
            var result = new List<QuestionData>();

            using (SqlConnection connection = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=
            X:\VS projects\SchoolWebServiceProphecyLabs\SchoolWebServiceProphecyLabs\Data\db.mdf;Integrated Security=True"))
            {
                connection.Open();

                using (SqlCommand cmd = new SqlCommand($"SELECT * FROM Jeopardy_Question WHERE id_topic='{id}'", connection))
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new QuestionData { text = reader.GetString(2), cost = reader.GetInt32(5), answer = reader.GetString(6) });
                    }
                }
            } 

            return result;
        }

        public List<string> GetGamesList(string login) {
            var result = new List<string>();
            using (SqlConnection connection = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=
            X:\VS projects\SchoolWebServiceProphecyLabs\SchoolWebServiceProphecyLabs\Data\db.mdf;Integrated Security=True"))
            {
                connection.Open();

                using (SqlCommand cmd = new SqlCommand($"SELECT * FROM Jeopardy WHERE user_login='{login}'", connection))
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(reader.GetString(2));
                    }
                } 
            } 
            return result;
        }

        //public string GetGamesInfo(string login, string name)
        //{
        //    string result = "";
        //    using (SqlConnection connection = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=
        //    X:\VS projects\SchoolWebServiceProphecyLabs\SchoolWebServiceProphecyLabs\Data\db.mdf;Integrated Security=True"))
        //    {
        //        connection.Open();

        //        using (SqlCommand cmd = new SqlCommand($"SELECT * FROM Jeopardy WHERE user_login='{login}' AND name = '{name}'", connection))
        //        using (SqlDataReader reader = cmd.ExecuteReader())
        //        { 
        //             result = reader.GetString(2);
        //        } 
        //    } 
        //    return result;
        //}
    }
}
