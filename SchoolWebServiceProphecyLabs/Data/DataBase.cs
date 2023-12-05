using Microsoft.Data.SqlClient;
using System.Security.Cryptography.X509Certificates;

namespace SchoolWebServiceProphecyLabs.Data
{
    public class DataBase
    {
        public static SqlConnection SqlConnection = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=X:\VS projects\SchoolWebServiceProphecyLabs\SchoolWebServiceProphecyLabs\Data\db.mdf;Integrated Security=True");

        public string Insert(string login, string email, string password) {
            if (Find(login))
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

        public bool Find(string login) {
            bool result = false;
            SqlCommand cmd = new SqlCommand($"SELECT * FROM Users WHERE user_login = '{login}';", SqlConnection);
            SqlConnection.Open();
            if (cmd.ExecuteReader().HasRows)
                result = true;
            SqlConnection.Close();
            return result;
        }
    }
}
