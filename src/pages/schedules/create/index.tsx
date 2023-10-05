import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSchedule } from 'apiSdk/schedules';
import { scheduleValidationSchema } from 'validationSchema/schedules';
import { ShipInterface } from 'interfaces/ship';
import { getShips } from 'apiSdk/ships';
import { ScheduleInterface } from 'interfaces/schedule';

function ScheduleCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ScheduleInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSchedule(values);
      resetForm();
      router.push('/schedules');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ScheduleInterface>({
    initialValues: {
      departure_date: new Date(new Date().toDateString()),
      arrival_date: new Date(new Date().toDateString()),
      departure_location: '',
      arrival_location: '',
      ship_id: (router.query.ship_id as string) ?? null,
    },
    validationSchema: scheduleValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Schedules',
              link: '/schedules',
            },
            {
              label: 'Create Schedule',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Schedule
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="departure_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Departure Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.departure_date ? new Date(formik.values?.departure_date) : null}
              onChange={(value: Date) => formik.setFieldValue('departure_date', value)}
            />
          </FormControl>
          <FormControl id="arrival_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Arrival Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.arrival_date ? new Date(formik.values?.arrival_date) : null}
              onChange={(value: Date) => formik.setFieldValue('arrival_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.departure_location}
            label={'Departure Location'}
            props={{
              name: 'departure_location',
              placeholder: 'Departure Location',
              value: formik.values?.departure_location,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.arrival_location}
            label={'Arrival Location'}
            props={{
              name: 'arrival_location',
              placeholder: 'Arrival Location',
              value: formik.values?.arrival_location,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ShipInterface>
            formik={formik}
            name={'ship_id'}
            label={'Select Ship'}
            placeholder={'Select Ship'}
            fetcher={getShips}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/schedules')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'schedule',
    operation: AccessOperationEnum.CREATE,
  }),
)(ScheduleCreatePage);
