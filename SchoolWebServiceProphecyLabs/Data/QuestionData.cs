namespace SchoolWebServiceProphecyLabs.Data
{
    public class QuestionData
    {
        public string text;
        public int cost;
        public string answer;
    }
    public class TopicData {
        public int id;
        public string title;
        public int round;
        public List<QuestionData> questions;
    }
    public class GameData {
        public string name;
        public List<TopicData> topics;
    }
}
