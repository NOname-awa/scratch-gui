/* eslint-env jest */
import projectStateReducer from '../../../src/reducers/project-state';
import {
    LoadingState,
    autoUpdateProject,
    doneCreatingProject,
    doneUpdatingProject,
    manualUpdateProject,
    onFetchedProjectData,
    onLoadedProject,
    projectError,
    remixProject,
    requestNewProject,
    requestProjectUpload,
    saveProjectAsCopy,
    setProjectId
} from '../../../src/reducers/project-state';

test('initialState', () => {
    let defaultState;
    /* projectStateReducer(state, action) */
    expect(projectStateReducer(defaultState, {type: 'anything'})).toBeDefined();
    expect(projectStateReducer(defaultState, {type: 'anything'}).error).toBe(null);
    expect(projectStateReducer(defaultState, {type: 'anything'}).projectData).toBe(null);
    expect(projectStateReducer(defaultState, {type: 'anything'}).projectId).toBe(null);
    expect(projectStateReducer(defaultState, {type: 'anything'}).loadingState).toBe(LoadingState.NOT_LOADED);
});

test('doneCreatingProject for new project with projectId type string shows project with that id', () => {
    const initialState = {
        projectId: null,
        loadingState: LoadingState.CREATING_NEW
    };
    const action = doneCreatingProject('100', initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe('100');
});

test('doneCreatingProject for new project with projectId type number shows project with id of type number', () => {
    const initialState = {
        projectId: null,
        loadingState: LoadingState.CREATING_NEW
    };
    const action = doneCreatingProject(100, initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe(100);
});

test('doneCreatingProject for remix shows project with that id', () => {
    const initialState = {
        projectId: null,
        loadingState: LoadingState.REMIXING
    };
    const action = doneCreatingProject('100', initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe('100');
});

test('doneCreatingProject for save as copy shows project with that id', () => {
    const initialState = {
        projectId: null,
        loadingState: LoadingState.CREATING_COPY
    };
    const action = doneCreatingProject('100', initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe('100');
});

test('onFetchedProjectData with id loads project data into vm', () => {
    const initialState = {
        projectData: null,
        loadingState: LoadingState.FETCHING_WITH_ID
    };
    const action = onFetchedProjectData('1010101', initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_WITH_ID);
    expect(resultState.projectData).toBe('1010101');
});

test('onFetchedProjectData new loads project data into vm', () => {
    const initialState = {
        projectData: null,
        loadingState: LoadingState.FETCHING_NEW_DEFAULT
    };
    const action = onFetchedProjectData('1010101', initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_NEW_DEFAULT);
    expect(resultState.projectData).toBe('1010101');
});

// onLoadedProject: LOADING_VM_WITH_ID

test('onLoadedProject(LOADING_VM_WITH_ID, true, true) results in state SHOWING_WITH_ID', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_WITH_ID
    };
    const action = onLoadedProject(initialState.loadingState, true, true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('onLoadedProject(LOADING_VM_WITH_ID, false, true) results in state SHOWING_WITH_ID', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_WITH_ID
    };
    const action = onLoadedProject(initialState.loadingState, true, true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('onLoadedProject(LOADING_VM_WITH_ID, false, false), with project id, ' +
    'results in state SHOWING_WITH_ID', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_WITH_ID,
        projectId: '12345'
    };
    const action = onLoadedProject(initialState.loadingState, false, false);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('onLoadedProject(LOADING_VM_WITH_ID, false, false), with no project id, ' +
    'results in state SHOWING_WITHOUT_ID', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_WITH_ID,
        projectId: null
    };
    const action = onLoadedProject(initialState.loadingState, false, false);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

// onLoadedProject: LOADING_VM_FILE_UPLOAD

test('onLoadedProject(LOADING_VM_FILE_UPLOAD, true, true) prepares to save', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_FILE_UPLOAD
    };
    const action = onLoadedProject(initialState.loadingState, true, true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.AUTO_UPDATING);
});

test('onLoadedProject(LOADING_VM_FILE_UPLOAD, false, true) results in state SHOWING_WITHOUT_ID', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_FILE_UPLOAD
    };
    const action = onLoadedProject(initialState.loadingState, false, true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

test('onLoadedProject(LOADING_VM_FILE_UPLOAD, false, false), when we know project id, ' +
    'results in state SHOWING_WITH_ID', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_FILE_UPLOAD,
        projectId: '12345'
    };
    const action = onLoadedProject(initialState.loadingState, false, false);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('onLoadedProject(LOADING_VM_FILE_UPLOAD, false, false), when we ' +
    'don\'t know project id, results in state SHOWING_WITHOUT_ID', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_FILE_UPLOAD,
        projectId: null
    };
    const action = onLoadedProject(initialState.loadingState, false, false);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

// onLoadedProject: LOADING_VM_NEW_DEFAULT

test('onLoadedProject(LOADING_VM_NEW_DEFAULT, true, true) results in state SHOWING_WITHOUT_ID', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_NEW_DEFAULT
    };
    const action = onLoadedProject(initialState.loadingState, true, true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

test('onLoadedProject(LOADING_VM_NEW_DEFAULT, false, true) results in state SHOWING_WITHOUT_ID', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_NEW_DEFAULT
    };
    const action = onLoadedProject(initialState.loadingState, false, true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

test('onLoadedProject(LOADING_VM_NEW_DEFAULT, false, false) results in ERROR state', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_NEW_DEFAULT
    };
    const action = onLoadedProject(initialState.loadingState, false, false);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.ERROR);
});

// doneUpdatingProject

test('doneUpdatingProject with id results in state SHOWING_WITH_ID', () => {
    const initialState = {
        loadingState: LoadingState.MANUAL_UPDATING
    };
    const action = doneUpdatingProject(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('doneUpdatingProject with id, before copy occurs, results in state CREATING_COPY', () => {
    const initialState = {
        loadingState: LoadingState.UPDATING_BEFORE_COPY
    };
    const action = doneUpdatingProject(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.CREATING_COPY);
});

test('doneUpdatingProject with id, before new, results in state FETCHING_NEW_DEFAULT', () => {
    const initialState = {
        loadingState: LoadingState.UPDATING_BEFORE_NEW
    };
    const action = doneUpdatingProject(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.FETCHING_NEW_DEFAULT);
});

test('calling setProjectId, using with same id as already showing, ' +
    'results in state SHOWING_WITH_ID', () => {
    const initialState = {
        projectId: '100',
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = setProjectId('100');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe('100');
});

test('calling setProjectId, using different id from project already showing, ' +
    'results in state FETCHING_WITH_ID', () => {
    const initialState = {
        projectId: 99,
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = setProjectId('100');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.FETCHING_WITH_ID);
    expect(resultState.projectId).toBe('100');
});

test('setProjectId, with same id as before, but not same type, ' +
    'results in FETCHING_WITH_ID because the two projectIds are not strictly equal', () => {
    const initialState = {
        projectId: '100',
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = setProjectId(100);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.FETCHING_WITH_ID);
    expect(resultState.projectId).toBe(100);
});

test('requestNewProject, when can\'t create/save, results in FETCHING_NEW_DEFAULT', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITHOUT_ID
    };
    const action = requestNewProject(false);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.FETCHING_NEW_DEFAULT);
});

test('requestNewProject, when can create/save, results in UPDATING_BEFORE_NEW ' +
    '(in order to save before fetching default project)', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = requestNewProject(true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.UPDATING_BEFORE_NEW);
});

test('requestProjectUpload when project not loaded results in state LOADING_VM_FILE_UPLOAD', () => {
    const initialState = {
        loadingState: LoadingState.NOT_LOADED
    };
    const action = requestProjectUpload(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_FILE_UPLOAD);
});

test('requestProjectUpload when showing project with id results in state LOADING_VM_FILE_UPLOAD', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = requestProjectUpload(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_FILE_UPLOAD);
});

test('requestProjectUpload when showing project without id results in state LOADING_VM_FILE_UPLOAD', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITHOUT_ID
    };
    const action = requestProjectUpload(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_FILE_UPLOAD);
});

test('manualUpdateProject should prepare to update', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = manualUpdateProject();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.MANUAL_UPDATING);
});

test('autoUpdateProject should prepare to update', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = autoUpdateProject();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.AUTO_UPDATING);
});

test('saveProjectAsCopy should save, before preparing to save as a copy', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = saveProjectAsCopy();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.UPDATING_BEFORE_COPY);
});

test('remixProject should prepare to remix', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = remixProject();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.REMIXING);
});

test('projectError from various states should show error', () => {
    const startStates = [
        LoadingState.AUTO_UPDATING,
        LoadingState.CREATING_NEW,
        LoadingState.FETCHING_NEW_DEFAULT,
        LoadingState.FETCHING_WITH_ID,
        LoadingState.LOADING_VM_NEW_DEFAULT,
        LoadingState.LOADING_VM_WITH_ID,
        LoadingState.MANUAL_UPDATING,
        LoadingState.REMIXING,
        LoadingState.CREATING_COPY,
        LoadingState.UPDATING_BEFORE_NEW
    ];
    for (const startState of startStates) {
        const initialState = {
            error: null,
            loadingState: startState
        };
        const action = projectError('Error string');
        const resultState = projectStateReducer(initialState, action);
        expect(resultState.error).toEqual('Error string');
    }
});

test('fatal projectError should show error state', () => {
    const startStates = [
        LoadingState.FETCHING_NEW_DEFAULT,
        LoadingState.FETCHING_WITH_ID,
        LoadingState.LOADING_VM_NEW_DEFAULT,
        LoadingState.LOADING_VM_WITH_ID
    ];
    for (const startState of startStates) {
        const initialState = {
            error: null,
            loadingState: startState
        };
        const action = projectError('Error string');
        const resultState = projectStateReducer(initialState, action);
        expect(resultState.loadingState).toBe(LoadingState.ERROR);
    }
});

test('non-fatal projectError should show normal state', () => {
    const startStates = [
        LoadingState.AUTO_UPDATING,
        LoadingState.CREATING_COPY,
        LoadingState.MANUAL_UPDATING,
        LoadingState.REMIXING,
        LoadingState.UPDATING_BEFORE_NEW
    ];
    for (const startState of startStates) {
        const initialState = {
            error: null,
            loadingState: startState
        };
        const action = projectError('Error string');
        const resultState = projectStateReducer(initialState, action);
        expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    }
});

test('projectError when creating new while viewing project with id should ' +
    'go back to state SHOWING_WITH_ID', () => {
    const initialState = {
        error: null,
        loadingState: LoadingState.CREATING_NEW,
        projectId: '12345'
    };
    const action = projectError('Error string');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('projectError when creating new while logged out, looking at default project ' +
    'should go back to state SHOWING_WITHOUT_ID', () => {
    const initialState = {
        error: null,
        loadingState: LoadingState.CREATING_NEW,
        projectId: '0'
    };
    const action = projectError('Error string');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

test('projectError encountered while in state FETCHING_WITH_ID results in ' +
    'ERROR state', () => {
    const initialState = {
        error: null,
        loadingState: LoadingState.FETCHING_WITH_ID
    };
    const action = projectError('Error string');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.ERROR);
    expect(resultState.error).toEqual('Error string');
});
