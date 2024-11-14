<?php

namespace App\Enum;

enum RoleEnum:string
{
    case Admin = 'admin';
    case User = 'user';
    case Commenter = 'commenter';

    public static function labels(){
      return [
        self::Admin => 'Admin',
        self::User => 'User',
        self::Commenter => 'Commenter',
      ];
    }

    public function label () {
      return match($this){
        self::Admin => 'Admin',
        self::User => 'User',
        self::Commenter => 'Commenter',
      };
    }
}
