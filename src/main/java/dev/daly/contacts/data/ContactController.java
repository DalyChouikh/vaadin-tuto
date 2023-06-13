package dev.daly.contacts.data;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/student")
public class ContactController {

    private final ContactService contactService;

    @GetMapping(value = "/home")
    public String home(){
        return "home";
    }


    @GetMapping(value = "/index")
    public String contacts(Model model, @RequestParam(name = "keyword", defaultValue = "") String keyword){
        List<Contact> contacts = contactService.findContactsByName(keyword);
        model.addAttribute("listContacts", contacts);
        model.addAttribute("keyword", keyword);
        return "student-views/students";
    }

    @GetMapping("/formCreate")
    public String createContact(Model model){
        model.addAttribute("student", new Contact());
        return "student-views/formCreate";
    }

    @GetMapping(value = "/delete")
    public String deleteContact(Long id, String keyword){
        contactService.removeContact(id);
        return "redirect:/student/index?keyword=" + keyword;
    }

    @GetMapping(value = "/formUpdate")
    public String updateContact(Model model, Long id){
        Contact contact = contactService.getContactById(id);
        model.addAttribute("student", contact);
        return "student-views/formUpdate";
    }

    @PostMapping(value = "/update")
    public String update(Contact contact){
        contactService.updateContact(contact);
        return "redirect:/student/index";
    }

    @PostMapping(value = "/save")
    public String save(@Valid Contact contact, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return "student-views/formCreate";
        }
        contactService.createContact(contact.getFirstName(), contact.getLastName(), contact.getAge(), contact.getPhone());
        return "redirect:/student/index";
    }

}
