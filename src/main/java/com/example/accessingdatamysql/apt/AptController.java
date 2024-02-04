package com.example.accessingdatamysql.apt;
import com.example.accessingdatamysql.User;
import com.example.accessingdatamysql.auth.AuthController;
import com.example.accessingdatamysql.myorg.OrgRosterRepository;
import com.example.accessingdatamysql.myorg.OrganizationRoster;
import com.example.accessingdatamysql.org.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController // This means that this class is a Controller
@RequestMapping(path="/apt") // This means URL's start with /demo (after Application path)
public class AptController {

    @Autowired
    private CustomAptRepository customAptRepository;

    @Autowired
    private AptRepository aptRepository;

    @PostMapping(path="/user/desc")
    public @ResponseBody Map<String, Object> getUserDesc(@RequestBody Map<String, String> json)
    {
        // This returns a JSON or XML with the users
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("user"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        response.put("result", "success");
        response.put("descriptions" , customAptRepository.getAptDescriptions((String) json.get("user")));
        return response;
    }

    @PostMapping(path="/user/delete")
    public @ResponseBody Map<String, Object> deleteUserApt(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("jwt") || !json.containsKey("id") )
        {
            response.put("result", "failed = bad request");
        }
        User found = new User();
        AuthController au = new AuthController();
        Map<String, String> res = au.verify(json); // if the jwt token could not be verified
        if (res.containsKey("login") && res.get("login").equals("failed"))
        {
            response.put("result", "failed = bad token");
            return response;
        }
        response.put("result", "success");
        response.put("apt deleted:", customAptRepository.deleteApt(res.get("user"), (String) json.get("id")));
        return response;
    }

    @PostMapping(path="/user/public")
    public @ResponseBody Map<String, Object> seeUserApt(@RequestBody Map<String, String> json)
    {
        // This returns a JSON or XML with the users
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("email"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        response.put("result", "success");
        response.put("descriptions" , customAptRepository.getAptDescriptions((String) json.get("email")));
        response.put("user" , customAptRepository.publicApt((String) json.get("email")));
        return response;
    }
    @PostMapping(path="/user/add")
    public @ResponseBody Map<String, Object> addUserApt(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("jwt"))
        {
            response.put("result", "failed = bad request");
        }
        AuthController au = new AuthController();
        Map<String, String> res = au.verify(json); // if the jwt token could not be verified
        if (res.containsKey("login") && res.get("login").equals("failed"))
        {
            response.put("result", "failed = bad token");
            return response;
        }
        response.put("result", "success");
        Apt apt = new Apt(res.get("user"), (String) json.get("description"), (String) json.get("id"));
        try
        {
            aptRepository.save(apt);
        }
        catch (Exception e)
        {
            System.out.println("Likely tried saving duplicate apartment id Exception: " + e);
        }
        return response;
    }
}
