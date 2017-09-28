class Player:
    STATE_INITIALIZED = 0
    STATE_LOADING = 1
    STATE_WAITING = 2
    STATE_GAME_STARTED = 3
    STATE_GAME_FINISHED = 4

    def __init__(self, p_id, nickname):
        self.p_id = p_id
        self.nickname = nickname
        self.x = 0
        self.y = 0
        self.inventory = Inventory()
        self.state = Player.STATE_INITIALIZED

    def update_position(self, x, y);
        self.x = x
        self.y = y

class Inventory:
    HELMET_NONE = 0
    HELMET_LEVEL_1 = 1
    HELMET_LEVEL_2 = 2
    HELMET_LEVEL_3 = 3
    VEST_NONE = 4
    VEST_LEVEL_1 = 5
    VEST_LEVEL_2 = 6
    VEST_LEVEL_3 = 7
    GUN_NONE = 8
    GUN_PISTOL = 9
    GUN_RIFLE = 10
    GUN_SHOTGUN = 11
    MELEE_NONE = 12
    MELEE_CROWBAR = 13
    MELEE_FRYPAN = 14

    def __init__(self):
        self.helmet_type = ARMOR_NONE
        self.vest_type = ARMOR_NONE
        self.gun_type = GUN_NONE
        self.melee_type = MELEE_NONE
    
    def update_inventory(self, type):
        if type >= Inventory.HELMET_NONE and type <= Inventory.HELMET_LEVEL_3:
            self.helmet_type = type
        elif type >= Inventory.VEST_NONE and type <= Inventory.VEST_LEVEL_3:
            self.vest_type = type
        elif type >= Inventory.GUN_NONE and type <= Inventory.GUN_SHOTGUN:
            self.vest_type = type
        elif type >= Inventory.MELEE_NONE and type <= Inventory.MELEE_FRYPAN:
            self.melee_type = type
        else: 
            return False
        return True

class Game:
    STATE_INITIALIZED = 0
    STATE_WAITING_FIRST_PLAYER = 1
    STATE_WAITING_SECOND_PLAYER = 2
    STATE_GAME_READY = 3
    STATE_IN_GAME = 4
    STATE_GAME_FINISHED = 5

    def __init__(self, g_id, player1_id, player2_id, map_info):
        self.g_id = g_id
        self.player1_id = player1_id
        self.player2_id = player2_id
        self.player1 = None
        self.player2 = None
        self.map_info = map_info
        self.state = Game.STATE_INITIALIZED
    
    def add_player(self, p_id, nickname):
        if self.player1_id == p_id:
            player1 = Player(p_id, nickname)
            self.__change_ready_state()
            return True
        elif self.player2_id == p_id:
            player2 = Player(p_id, nickname)
            self.__change_ready_state()
            return True
        else:
            return False

    def __change_ready_state(self):
        counter = 0
        if player is not None: counter += 1
        if player is not None: counter += 1

        if counter == 0: self.state = Game.STATE_WAITING_FIRST_PLAYER
        elif counter == 1: self.state = Game.STATE_WAITING_SECOND_PLAYER
        else: 
            self.state = Game.STATE_GAME_READY
            # Call Game Ready Function

class GameManager:
    MAP_DEFAULT = 0

    def __init__(self):
        self.games = list()

    def make_new_game(self, g_id, player1_id, player2_id):
        self.games.append(Game(g_id, player1_id, player2_id, MAP_DEFAULT))

    def make_new_player(self, g_id, p_id, nickname):
        for game in self.games:
            if game.g_id == g_id:
                add_result = game.add_player(p_id, nickname)
                if not add_result: return 1 # Error
                else: return 0
        return 2