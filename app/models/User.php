<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

use Phalcon\Validation;
use Phalcon\Mvc\Model\Validator\Email as EmailValidator;
use Phalcon\Mvc\Model\Validator\PresenceOf;
use Phalcon\Mvc\Model\Validator\Uniqueness;

class User extends ModelBase
{
    public $user_id;
    public $email;
    public $name;
    public $description;
    public $password;
    public $new_password;
    public $new_password_created_at;

    public $created_at;
    public $updated_at;
    public $logged_at;

    public $is_admin = 0;

    public $file = null;

    public function initialize() {
        parent::initialize();
    }

    public function validation() {

        $this->validate(new PresenceOf(array(
            "field" => 'email',
            "message" => '이메일을 입력해주세요.'
        )));

        $this->validate(new EmailValidator(array(
            'field' => 'email',
            'message' => '이메일 형식이 아닙니다.'
        )));

        $this->validate(new Uniqueness(array(
            "field"   => "email",
            "message" => "이미 등록된 이메일입니다."
        )));

        $this->validate(new PresenceOf(array(
            "field" => 'name',
            "message" => '이름을 입력해주세요.'
        )));

        $this->validate(new PresenceOf(array(
            "field" => 'password',
            "message" => '비밀번호를 입력해주세요.'
        )));


        if ($this->validationHasFailed() == true) {
            return false;
        }
    }

    public function save($data = null, $whiteList = null)
    {
        if(!$this->user_id) {
            $this->created_at = time();
        }
        $this->updated_at = time();

        return parent::save($data, $whiteList);
    }

    /**
     * @param null $parameters
     * @return \Phalcon\Mvc\Model\ResultsetInterface|User[]
     */
    public static function find($parameters=null) {
        return parent::find($parameters);
    }

    /**
     * @param null $parameters
     * @return \Phalcon\Mvc\Model|User
     */
    public static function findFirst($parameters=null) {
        $user = parent::findFirst($parameters);
        return $user;
    }

    /**
     * 사용자가 독서량을 등록할 수 있는지 여부
     * @param int $meeting_id
     * @return bool
     */
    public function isMeetingBook($meeting_id=0) {
        if(!$meeting_id) {
            return false;
        }
        $meeting_book = MeetingBook::findFirst("meeting_id = {$meeting_id} and user_id = {$this->user_id}");
        if($meeting_book) {
            return true;
        }
        return false;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getFile($type="user") {
        if($this->file) {
            return $this->file;
        }
        $this->file = File::findFirst("target = 'user' and target_id = {$this->user_id}");
        return $this->file;
    }

    public function getAvatarUrl($width="200", $height=null) {
        $file = $this->getFile();
        if(!$file) {
            return "/assets/img/default-user.png";
        }
        if(!$height) {
            $height = $width;
        }
        $thumb_url = $file->getThumbnail($width, $height);
        return $thumb_url;
    }

    public function getBookGroups() {

        $di = $this->getDI();
        $session = $di->get('session');
        $user_id = $session->get('user_id');

        $phql = "SELECT * FROM BookGroup bg LEFT JOIN Member m ON bg.book_group_id = m.book_group_id WHERE m.user_id = {$user_id}";
        $query = $this->modelsManager->createQuery($phql);
        $book_groups = $query->execute();

        return $book_groups;

    }

    public function getMeetings() {
        $di = $this->getDI();
        $session = $di->get('session');
        $user_id = $session->get('user_id');

    }

    public function getProcessMeetings() {
        $di = $this->getDI();
        $session = $di->get('session');
        $user_id = $session->get('user_id');

        $sql = "SELECT m.* FROM meeting m LEFT JOIN ".
                "book_group bg ON m.book_group_id = bg.book_group_id ".
                "WHERE bg.book_group_id IN ( ".
	                "SELECT bg.book_group_id ".
                    "FROM book_group bg LEFT JOIN member m ON bg.book_group_id = m.book_group_id ".
                    "WHERE m.user_id = {$user_id});";

        // Base model
        $meeting = new Meeting();

        // Execute the query
        $result = new Resultset(null, $meeting, $meeting->getReadConnection()->query($sql, null));

        return $result;
    }


    /**
     * @param $number
     * @return stdClass
     */
    public static function isMobileNumber($number) {
        $result = new stdClass();
        $result->status = false;
        $result->message = "휴대폰번호를 정확히 입력해주세요.";

        $number = preg_replace('/[!#$%^&*()?+=\/-]/', "", $number);

        $number = preg_replace("/[^0-9]/", "", $number);

        if(preg_match("/[^0-9]/", $number)) {
            return $result;
        }

        $number = preg_replace("/[^0-9]/", "", $number);

        if(preg_match("/^01[0-9]{8,9}$/", $number)) {
            $result->status = true;
            $result->message = "성공";
            return $result;
        }
        else {
            return $result;
        }
    }

    public static function getMobileNumber($number) {
        $number = preg_replace('/[!#$%^&*()?+=\/-]/', "", $number);
        $number = preg_replace("/[^0-9]/", "", $number);
        return $number;
    }

    public static function nameValidCheck($name) {
        $result = new stdClass();
        $result->status = false;
        $result->message = "이름을 정확히 입력해주세요.";

//        for($i = 0; $i < strlen($name); $i++) {
//            if(ord($name[$i]) <= 0x80) {
//                return $result;
//            }
//        }

        if(preg_match('/[0-9!@#$%^&+=]+/', $name)) {
            return $result;
        } else {
            $result->status = true;
            $result->message = "성공";
            return $result;
        }
    }

    public static function emailValidCheck($email) {
        $result = new stdClass();
        $result->status = false;
        $result->message = Lang::$msg_email_required;

        if(!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email)) {
            return $result;
        } else {
            $result->status = true;
            $result->message = "성공";
            return $result;
        }
    }

    public static function passwordValidCheck($password) {
        $result = new stdClass();
        $result->status = false;
        $result->message = "8자리 이상,영문/숫자 조합"; // 최소 조건

        if(preg_match('/^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/', $password)) {
            $result->status = true;
            $result->message = "성공";
            return $result;
        } else {
            if (!preg_match('/^[0-9A-Za-z]{8,}$/', $password) || !preg_match('/\d/', $password) || !preg_match('/[a-zA-Z]/', $password)) {
                return $result;
            } else {
                $result->status = true;
                $result->message = "성공";
                return $result;
            }
        }

    }

    public function getName() {
        return $this->name;
    }

    public function getBirth() {
        return $this->birth_date;
    }

    public function getCertificateBirth() {
        $birth_date = $this->getBirth();
        return substr($birth_date, 2, 6);
    }

    public function getYear() {
        return substr($this->getBirth(),0, 4);
    }

    public function getMonth() {
        return substr($this->getBirth(),4, 2);
    }

    public function getDay() {
        return substr($this->getBirth(),6, 2);
    }

    public function getGenderNumber() {
        if($this->gender == "남자") {
            return 1;
        } else {
            return 2;
        }
    }

    public function getMobile() {
        return $this->mobile;
    }

    public function getH1() {
        return substr($this->getMobile(),0, 3);
    }

    public function getH2() {
        $mobile_length = $this->getMobileLength();
        $substr_length = 0;
        if($mobile_length == 11) {
            $substr_length = 4;
        }
        if($mobile_length == 10) {
            $substr_length = 3;
        }
        return substr($this->getMobile(),3, $substr_length);
    }

    public function getH3() {
        $mobile_length = $this->getMobileLength();
        $start_index = 0;
        if($mobile_length == 11) {
            $start_index = 7;
        }
        if($mobile_length == 10) {
            $start_index = 6;
        }
        return substr($this->getMobile(),$start_index, 4);
    }

    public function getMobileLength() {
        return strlen($this->getMobile());
    }

}