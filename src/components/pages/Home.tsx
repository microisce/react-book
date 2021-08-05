import React, {useState} from "react";
import {Header} from "../skeleton/Header";
import {BookListing} from "../elements/BookListing";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Button, createStyles, FormControl, InputLabel, Select, TextField} from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import {BOOKS, LANGUAGES} from "../../shared/constantes";
import {IFramework} from "../../shared/interfaces";


export function Home() {
    const classes = useStyles();
    const [count, setCount] = useState(0);

    const [query, setQuery] = React.useState('');
    const [language, setLanguage] = React.useState('');
    const [frameworks, setFrameworks] = React.useState([] as IFramework[]);
    const [framework, setFramework] = React.useState('');
    const [canSearch, setCanSearch] = React.useState(false);

    const handleChangeLanguage = (event: React.ChangeEvent<{ value: any }>) => {
        setLanguage(event.target.value as string);
        if (event.target.value === ''){
            setFrameworks([])
            setFramework('')
        }
        else{
            const language = LANGUAGES.find(lang => lang.name === event.target.value)
            if (language && language.frameworks){
                setFrameworks(language.frameworks)
            }
        }

    };


    const handleChangeFramework = (event: React.ChangeEvent<{ value: any }>) => {
        setFramework(event.target.value as string);
    };

    const handleChangeQuery = (event: React.ChangeEvent<{ value: any }>) => {
        const newValue = event.target.value as string
        setQuery(newValue);
        // setCanSearch(newValue !== '')
    };

    return (
        <div>
            <Header/>
            <div className={'searchDiv'}>
                <TextField id="filled-basic"
                           label="Filled"
                           variant="outlined"
                           onChange={handleChangeQuery}
                           className={classes.formControl}/>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="lang-label">Language</InputLabel>
                    <Select
                        labelId="lang-label"
                        id="lang-select"
                        value={language}
                        variant="outlined"
                        label = 'Language'
                        onChange={handleChangeLanguage}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {
                            LANGUAGES.map(lang => {
                                return <MenuItem value={lang.name}>{lang.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="fr-label">Framework</InputLabel>
                    <Select
                        variant="outlined"
                        labelId="fr-label"
                        id="fr-select"
                        value={framework}
                        label = 'Framework'
                        onChange={handleChangeFramework}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {
                            frameworks.map(f => {
                                return <MenuItem value={f.name}>{f.name + ' - ' + f.stack}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <Button variant="contained"
                        disabled={!canSearch}
                        color="primary" className={classes.searchButton}>
                    Search
                </Button>

            </div>
            <BookListing books={BOOKS}/>

            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );

}



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        searchButton: {
            margin: theme.spacing(1),
            minWidth: 100,
        }
    }),
);
