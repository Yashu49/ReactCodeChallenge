import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { path, not, prop } from 'ramda'
import LinkedReferenceParametersTable from 'components/LinkedReferenceParametersTable'
import { Loading } from 'components/chec'
import SupportParameterEditor from 'components/SupportParameterEditors/SupportParameterEditor'
import { Col, Row } from 'components/patterns'
import { getSwitchContext } from 'utils/switchData'
import ErrorBoundary from 'components/ErrorBoundary'
import strings from 'utils/strings.js'

const SupportParameterSchematic = (props) => {
    const {
        requestSPDetails,
        onUnmount,
        param,
        requestSPDetails,
        spBeingEdited,
        isEditRoute,
        setSpToEdit,
        isDuplicating,
        isLoading,
        signals,
        linkedRPs,
        currentSPUri,
        onDuplicate,
        onEdit,
        onCancel,
        onSave,
        siblingSPs,
    } = props;

    const [spUri, setspUri] = useState(null);

    useEffect(() => {
        if (not(path(['param', 'status'], { ...props }))) {
            requestSPDetails()
        }

        /* Function called when component unmounts */
        return () => {
            onUnmount()
        }
    }, [])

    useEffect(() => {
        if (!isLoading && !isDuplicating && (!param || !param.id)) {
            requestSPDetails()
        }
        if (prop('id', param) && isEditRoute && !spBeingEdited) {
            setSpToEdit()
        }
    }, [isLoading, isDuplicating, param, isEditRoute, spBeingEdited])

    return !param ? (
        <Loading />
    ) : (
        <ErrorBoundary
            signal={[signals.getSupportParam, signals.duplicateSupportParameter]}
        >
            <Row>
                <Col span={24}>
                    <SupportParameterEditor
                        param={param}
                        siblingSPs={siblingSPs}
                        currentSPUri={currentSPUri}
                        onDuplicate={onDuplicate}
                        onEdit={onEdit}
                        onCancel={onCancel}
                        onSave={onSave}
                        switchContext={
                            linkedRPs && linkedRPs[0]
                                ? getSwitchContext(
                                    linkedRPs[0].refParameterNumber,
                                    linkedRPs[0].release
                                )
                                : 'smartPlex'
                        }
                        linkedRPs={linkedRPs}
                    />
                </Col>
                <Col span={24}>
                    <div className="sp-schematic_reference-parameters">
                        <span className="sp-schematic_linked-params-table-caption">
                            {strings.rps_in_use}
                        </span>
                        <ErrorBoundary signal={signals.getLinkedRPs}>
                            <LinkedReferenceParametersTable dataSource={linkedRPs} />
                        </ErrorBoundary>
                    </div>
                </Col>
            </Row>
        </ErrorBoundary>
    )
}
}

SupportParameterSchematic.propTypes = {
    param: PropTypes.object,
    spBeingEdited: PropTypes.object,
    signals: PropTypes.object,
    isEditRoute: PropTypes.bool,
    isDuplicating: PropTypes.bool,
    isLoading: PropTypes.bool,
    linkedRPs: PropTypes.array,
    siblingSPs: PropTypes.array,
    currentSPUri: PropTypes.string,
    requestSPDetails: PropTypes.func,
    setSpToEdit: PropTypes.func,
    onDuplicate: PropTypes.func,
    onEdit: PropTypes.func,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    onUnmount: PropTypes.func,
}

export default SupportParameterSchematic;