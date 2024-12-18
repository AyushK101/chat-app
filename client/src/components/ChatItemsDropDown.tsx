"use client"

import * as React from "react"
import { Check, ChevronsUpDown, CircleX } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UserType } from "@/types"
import { Input } from "./ui/input"



export function ChatItemsDropDown({ allUsers = [], isGroup }: { allUsers: UserType[], isGroup: boolean }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [groupParticipants, setGroupParticipants] = React.useState<UserType[] | []>([])
  const [oneToOneUser, setOneToOneUser] = React.useState<UserType>();
  const [groupName, setGroupName] = React.useState('');


  function addGroupParticipants(userToAdd: UserType | null) {
    groupParticipants.map(user => {
      if (user._id == userToAdd?._id) {
        userToAdd = null
        alert("can't add two times");
        return
      }
    }
    )
    if (userToAdd != null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore 
      setGroupParticipants(prev => [...prev, userToAdd])
    }
  }

  function removeFromParticipants(toDeleteUser: UserType) {
    setGroupParticipants(prev => prev.filter(user => user._id != toDeleteUser._id))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isGroup) {
      console.log({ isGroup, groupParticipants, groupName})
    } else {
      console.log({ isGroup, oneToOneUser })
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="py-2 my-2" >
        {
          isGroup && <Input onChange={(e) => setGroupName(e.target.value)} aria-label="Group Name" placeholder="enter group name" className="p-2 my-2" />
        }
        <Popover open={open} onOpenChange={setOpen} >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? allUsers.find((user) => user.username === value)?.username
                : "Select User..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search user..." className="h-9" />
              <CommandList>
                <CommandEmpty>No user found.</CommandEmpty>
                <CommandGroup>
                  {allUsers.map((user) => (
                    <CommandItem
                      key={user._id}
                      value={user.username}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                        setOneToOneUser(user)
                        addGroupParticipants(user)
                      }}
                    >
                      {user.username}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === user.username ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-wrap gap-2 m-1 p-1">
        {
          isGroup && groupParticipants.map(user => {
            return <Button onClick={() => removeFromParticipants(user)}><CircleX />{user.username}</Button>
          })
        }
      </div>
      <div className="flex justify-center"><Button type="submit">{isGroup ? 'create Group' : 'create chat'} </Button></div>
    </form>
  )
}
