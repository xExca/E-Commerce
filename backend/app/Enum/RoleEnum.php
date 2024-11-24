<?php

namespace App\Enum;

enum RoleEnum:string
{
    case Admin = 'admin';
    case User = 'user';
    case Staff = 'staff';

    public static function labels(){
      return [
        self::Admin => 'Admin',
        self::User => 'User',
        self::Staff => 'Staff',
      ];
    }

    public function label () {
      return match($this){
        self::Admin => 'Admin',
        self::User => 'User',
        self::Staff => 'Staff',
      };
    }
}
