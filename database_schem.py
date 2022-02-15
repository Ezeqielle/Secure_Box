from pony.orm import *

db = Database()

class Reports(db.Entity):
    report_id = PrimaryKey(int, auto=True)
    reports_name = Required(str, unique=True)
    reports_date = Required(datetime)
    users = set("users")
    vuln = set("vuln")
    hosts = set("hosts")

class Users(db.Entity):
    user_id = PrimaryKey(int, auto=True)
    user_name = Required(str, unique=False)
    user_mail = Required(str, unique=True)
    pwd = Required(str, unique=False)
    reports = set(Reports)
    roles = set("roles")

class Roles(db.Entity):
    role_id = PrimaryKey(int, auto=True)
    role_name = Required(str, unique=True)
    user = set(Users)

class Hosts(db.Entity):
    host_id = PrimaryKey(int, auto=True)
    host_name = Required(str, unique=True)
    host_os = Optional(str, unique=False)
    host_ip = Required(str, unique=True)
    host_mac_addr = Required(str, unique=True)
    report = Required(Reports)
    vuln = set("vuln")
    ports = set("ports")


class Vuln(db.Entity):
    vuln_id = PrimaryKey(int, auto=True)
    vuln_name = Optional(str)
    vuln_date = Optional(date)
    vuln_criticity = Optional(int)
    vuln_desc = Optional(Longstr)
    vuln_url = Optional(str)
    vuln_attack_vector = Optional(str)
    vuln_attack_complexity = Optional(str)
    vuln_impact_availability = Optional(str)
    vuln_impact_integrity = Optional(str)
    hosts = set(Hosts)

class Ports(db.Entity):
    port_id = PrimaryKey(int, auto=True)
    port_number = Required(int)
    port_protocole = Required(str)
    version = Optional(str)
    application = Optional(Longstr)
    vuln = set(Vuln)
    hosts = Required(Hosts)


sql_debug(True)
db.bind(provider='mysql', user='root', password='root', host='localhost', database='secureBox')
db.generate_mapping(create_tables=True)
