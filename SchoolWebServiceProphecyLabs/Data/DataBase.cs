﻿using Microsoft.Data.SqlClient;
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

        public void CreateGame (string login, string name)
        {
            SqlCommand cmd = new SqlCommand($"INSERT INTO Jeopardy (user_login, name) values ('{login}','{name}')", SqlConnection);
        }
        public void CreateTopic (int gameId, string title, int round) {
            SqlCommand cmd = new SqlCommand($"INSERT INTO Jeopardy_Topic (id_jepardy, tittle, round) values ('{gameId}','{title}','{round}')", SqlConnection);

        }
        public void CreateQuestion( int topicId, QuestionData data )
        {
            SqlCommand cmd = new SqlCommand($"INSERT INTO Jeopardy_Question (id_topic, text, reward, answer) values ('{topicId}','{data.text}','{data.cost}','{data.answer}')", SqlConnection);
        }
    }
}
