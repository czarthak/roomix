package com.example.accessingdatamysql.item;

import com.example.accessingdatamysql.User;
import com.example.accessingdatamysql.UserRepository;
import com.example.accessingdatamysql.auth.AuthController;
import com.example.accessingdatamysql.myorg.MyOrgRosterRepository;
import com.example.accessingdatamysql.myorg.OrgRosterController;
import com.example.accessingdatamysql.myorg.OrgRosterRepository;
import com.example.accessingdatamysql.myorg.OrganizationRoster;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.antlr.v4.runtime.misc.ObjectEqualityComparator;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path="/item")
public class ItemController {
    @Autowired
    private MyOrgRosterRepository myOrgRosterRepository;

    @Autowired
    private CustomItemRepository customItemRepository;

    @Autowired
    private UserRepository userRepository;


    @PostMapping(path="/all")
    public @ResponseBody Map<String, Object> getItems(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("orgId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Integer orgId = 0;
        if (json.get("orgId") instanceof Integer)
        {
            orgId = (Integer) json.get("orgId");
        }
        else
        {
            orgId = Integer.parseInt((String)(json.get("orgId")));
        }
        response.put("data", customItemRepository.getAllItems(orgId));
        response.put("result", "success");
        return response;
    }
    @PostMapping(path="/user/all")
    public @ResponseBody Map<String, Object> getItemsToken(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("orgId") || !json.containsKey("jwt"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            Integer orgId = 0;
            if (json.get("orgId") instanceof Integer)
            {
                orgId = (Integer) json.get("orgId");
            }
            else
            {
                orgId = Integer.parseInt((String)(json.get("orgId")));
            }
            response.put("data", customItemRepository.getAllItems(orgId));
            response.put("result", "success");
            response.put("type", map.get("type"));
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }


    @PostMapping(path="/user/oneitem")
    public @ResponseBody Map<String, Object> getItemToken(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("orgId") || !json.containsKey("jwt") || !json.containsKey("itemId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            Integer orgId = 0;
            Integer itemId;
            if (json.get("orgId") instanceof Integer)
            {
                orgId = (Integer) json.get("orgId");
            }
            else
            {
                orgId = Integer.parseInt((String)(json.get("orgId"))); }
            if (json.get("itemId") instanceof Integer)
                itemId = (Integer) json.get("itemId");
            else
                itemId = Integer.parseInt((String)(json.get("itemId")));
            response.put("data", customItemRepository.getItem(orgId, itemId));
            response.put("result", "success");
            response.put("type", map.get("type"));
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }
    @PostMapping(path="/user/oneitem/create")
    public @ResponseBody Map<String, Object> createItemToken(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("orgId") || !json.containsKey("jwt") || !json.containsKey("name")
                || !json.containsKey("description") || !json.containsKey("quantity") || !json.containsKey("category")
                || !json.containsKey("status") || !json.containsKey("locationId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            if (map.get("type") != OrganizationRoster.Type.MANAGER && map.get("type") != OrganizationRoster.Type.OWNER)
            {
                response.put("result", "failure - not authorized, user cannot delete");
                return response;
            }
            response.put("data", customItemRepository.createItem(json));
            response.put("result", "success");
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }

    @PostMapping(path="/user/oneitem/delete")
    public @ResponseBody Map<String, Object> deleteItemToken(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("orgId") || !json.containsKey("jwt") || !json.containsKey("itemId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            Integer itemId;
            if (map.get("type") != OrganizationRoster.Type.MANAGER && map.get("type") != OrganizationRoster.Type.OWNER)
            {
                response.put("result", "failure - not authorized, user cannot delete");
                return response;
            }
            if (json.get("itemId") instanceof Integer)
                itemId = (Integer) json.get("itemId");
            else
                itemId = Integer.parseInt((String)(json.get("itemId")));
            response.put("data", customItemRepository.deleteItem(itemId));
            response.put("result", "success");
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }
    @PutMapping(path="/user/oneitem")
    public @ResponseBody Map<String, Object> updateItemToken(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("orgId") || !json.containsKey("jwt") || !json.containsKey("itemId") || !json.containsKey("name")
                || !json.containsKey("description") || !json.containsKey("quantity") || !json.containsKey("category")
                    || !json.containsKey("status") || !json.containsKey("locationId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            Integer itemId;
            if (map.get("type") != OrganizationRoster.Type.MANAGER && map.get("type") != OrganizationRoster.Type.OWNER)
            {
                response.put("result", "failure - not authorized, user cannot delete");
                return response;
            }
            if (json.get("itemId") instanceof Integer)
                itemId = (Integer) json.get("itemId");
            else
                itemId = Integer.parseInt((String)(json.get("itemId")));
            response.put("data", customItemRepository.updateItem(json));
            response.put("result", "success");
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }

    @PostMapping(path="/user/location")
    public @ResponseBody Map<String, Object> getLocation(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("jwt") || !json.containsKey("orgId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            Integer orgId;
            if (json.get("orgId") instanceof Integer)
                orgId = (Integer) json.get("orgId");
            else
                orgId = Integer.parseInt((String)(json.get("orgId")));
            response.put("data", customItemRepository.getLocation(orgId));
            response.put("result", "success");
            response.put("type", map.get("type"));
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }
    @PostMapping(path="/user/location/create")
    public @ResponseBody Map<String, Object> createLocation(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("jwt") || !json.containsKey("orgId") || !json.containsKey("location"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            Integer orgId;
            if (json.get("orgId") instanceof Integer)
                orgId = (Integer) json.get("orgId");
            else
                orgId = Integer.parseInt((String)(json.get("orgId")));
            if (map.get("type") == OrganizationRoster.Type.MEMBER)
            {
                response.put("result", "failure - members are not authorized to create locations");
                response.put("type", map.get("type"));
                return response;
            }
            response.put("data", customItemRepository.createLocation((String)json.get("location"), orgId));
            response.put("result", "success");
            response.put("type", map.get("type"));
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }
    @PostMapping(path="/user/location/delete")
    public @ResponseBody Map<String, Object> deleteLocation(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("jwt") || !json.containsKey("orgId") || !json.containsKey("locationId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            Integer locationId;
            if (json.get("locationId") instanceof Integer)
                locationId = (Integer) json.get("locationId");
            else
                locationId = Integer.parseInt((String)(json.get("locationId")));
            if (map.get("type") == OrganizationRoster.Type.MEMBER)
            {
                response.put("result", "failure - members are not authorized to delete locations");
                response.put("type", map.get("type"));
                return response;
            }
            response.put("data", customItemRepository.deleteLocation(locationId));
            response.put("result", "success");
            response.put("type", map.get("type"));
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }
    @PostMapping(path="/location/all")
    public @ResponseBody Map<String, Object> getItemLocations(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("jwt") || !json.containsKey("orgId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            Integer orgId;
            if (json.get("orgId") instanceof Integer)
                orgId = (Integer) json.get("orgId");
            else
                orgId = Integer.parseInt((String)(json.get("orgId")));
            if (map.get("type") == OrganizationRoster.Type.MEMBER)
            {
                response.put("result", "failure - members are not authorized to view managerial information");
                response.put("type", map.get("type"));
                return response;
            }
            response.put("data", customItemRepository.getLocationCount(orgId));
            response.put("result", "success");
            response.put("type", map.get("type"));
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }

    @PostMapping(path="/category/available")
    public @ResponseBody Map<String, Object> getItemCategoryAvailable(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("jwt") || !json.containsKey("orgId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            Integer orgId;
            if (json.get("orgId") instanceof Integer)
                orgId = (Integer) json.get("orgId");
            else
                orgId = Integer.parseInt((String)(json.get("orgId")));
            if (map.get("type") == OrganizationRoster.Type.MEMBER)
            {
                response.put("result", "failure - members are not authorized to view managerial information");
                response.put("type", map.get("type"));
                return response;
            }
            response.put("data", customItemRepository.getAvailableItemCategoryCount(orgId));
            response.put("result", "success");
            response.put("type", map.get("type"));
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }
    @PostMapping(path="/category/borrowed")
    public @ResponseBody Map<String, Object> getItemCategoryBorrowed(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("jwt") || !json.containsKey("orgId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            Integer orgId;
            if (json.get("orgId") instanceof Integer)
                orgId = (Integer) json.get("orgId");
            else
                orgId = Integer.parseInt((String)(json.get("orgId")));
            if (map.get("type") == OrganizationRoster.Type.MEMBER)
            {
                response.put("result", "failure - members are not authorized to view managerial information");
                response.put("type", map.get("type"));
                return response;
            }
            response.put("data", customItemRepository.getBorrowedItemCategoryCount(orgId));
            response.put("result", "success");
            response.put("type", map.get("type"));
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }
    /*
    Private helper function to validate that the user is supposed to see this data
     */
    private @ResponseBody Map<String, Object> getUserOrg(Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("orgId") || !json.containsKey("jwt"))
        {
            response.put("result", "failed - bad request");
            return response;
        }
        User found = new User();
        AuthController au = new AuthController();
        Map<String, String> res =  au.verify(json); // if the jwt token could not be verified
        if (res.containsKey("login") && res.get("login").equals("failed"))
        {
            response.put("result", "failed = bad token or bad request");
            return response;
        }
        Optional<User> usr = userRepository.findById(res.get("user"));
        if (!usr.isPresent())
        {
            response.put("result", "failed = user not found");
            return response;
        }
        if (json.get("orgId") instanceof Integer)
            return myOrgRosterRepository.findUserOrg(usr.get().getEmail(), (Integer) json.get("orgId"));
        return myOrgRosterRepository.findUserOrg(usr.get().getEmail(),  Integer.parseInt((String) json.get("orgId")));
    }
}
