package dev.daly.contacts.data;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;


    public List<Contact> findAllContacts(String filterText){
        if(filterText == null || filterText.isEmpty())
            return contactRepository.findAll();
        return contactRepository.findContactsByNameContains(filterText);
    }

    public Long countContacts(){
        return contactRepository.count();
    }

    public void deleteContact(Contact contact){
        contactRepository.delete(contact);
    }

    public void saveContact(Contact contact){
        if(contact == null){
            System.err.println("Contact is null");
        }else {
            contactRepository.save(contact);
        }
    }


}
